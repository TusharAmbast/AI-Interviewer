"use client"
import { UserDetailContext } from '@/Context/userDetailContext';
import { supabase } from '@/services/supabaseClient'
import React, {useState, useEffect, useContext } from 'react'

function Provider({ children }) {

    const [user,setUser] = useState();
    useEffect(() => {
        // This listener waits for the actual "SIGNED_IN" event
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            console.log("Auth Event:", event); // This will confirm if the login happened
            
            if (session?.user) {
                await createNewUser(session.user);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const createNewUser = async (user) => {
        console.log("Syncing user to DB:", user.email);

        // 1. Check if user exists
        const { data: Users, error: fetchError } = await supabase
            .from('Users')
            .select('*')
            .eq('Email', user?.email);

        if (fetchError) {
            console.error("Fetch Error:", fetchError);
            return;
        }

        // 2. Insert if new user
        if (Users?.length === 0) {
            const { error: insertError } = await supabase
                .from('Users')
                .insert([
                    { 
                        Email: user?.email, 
                        Name: user?.user_metadata?.full_name || user?.user_metadata?.name,
                        Picture: user?.user_metadata?.avatar_url,
                    },
                ]);

            if (!insertError) {
                setUser({
                    Email: user?.email,
                    Name: user?.user_metadata?.full_name || user?.user_metadata?.name,
                    Picture: user?.user_metadata?.avatar_url,
                });
            }
            return;
        } else {
            console.log("User already exists in DB.");
        }
        setUser(Users[0]);
        Users[0].Picture = user?.user_metadata?.avatar_url;
    }

    return( 
        <UserDetailContext.Provider value={{ user, setUser }}>
            <div>{children}</div>
        </UserDetailContext.Provider>
    )
}

export default Provider;

export const useUser = () => {
    const context = useContext(UserDetailContext);
    return context;
}