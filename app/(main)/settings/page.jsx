"use client"

import React, { useEffect, useState } from 'react'
import { useUser } from '@/app/provider'
import { supabase } from '@/services/supabaseClient'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useTheme } from '@/Context/ThemeContext'
import {
  User,
  Mail,
  CreditCard,
  Shield,
  Bell,
  LogOut,
  Trash2,
  Save,
  Camera,
  Sparkles,
  Clock,
  CheckCircle,
  AlertTriangle,
  ChevronRight,
  Moon,
  Sun,
  Globe,
} from 'lucide-react'

function Settings() {
  const { user, setUser } = useUser()
  const router = useRouter()
  const { darkMode, toggleDarkMode } = useTheme()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [interviewCount, setInterviewCount] = useState(0)
  const [memberSince, setMemberSince] = useState('')
  const [credits, setCredits] = useState(0)
  const [emailNotifications, setEmailNotifications] = useState(true)

  useEffect(() => {
    if (user) {
      setName(user?.Name || '')
      setEmail(user?.Email || '')
      setCredits(user?.Credits ?? 5)
      fetchInterviewCount()
      fetchMemberSince()
    }
  }, [user])

  const fetchInterviewCount = async () => {
    const { count, error } = await supabase
      .from('Interview')
      .select('*', { count: 'exact', head: true })
      .eq('userEmail', user?.Email)

    if (!error) {
      setInterviewCount(count || 0)
    }
  }

  const fetchMemberSince = async () => {
    const { data, error } = await supabase
      .from('Users')
      .select('created_at')
      .eq('Email', user?.Email)
      .single()

    if (data?.created_at) {
      setMemberSince(
        new Date(data.created_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      )
    }
  }

  const handleSaveProfile = async () => {
    setIsSaving(true)
    try {
      const { error } = await supabase
        .from('Users')
        .update({ Name: name })
        .eq('Email', user?.Email)

      if (error) throw error

      setUser({ ...user, Name: name })
      toast.success('Profile updated successfully!')
    } catch (error) {
      toast.error('Failed to update profile. Please try again.')
      console.error('Update error:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push('/auth')
    toast.success('Signed out successfully!')
  }

  const handleDarkModeToggle = () => {
    toggleDarkMode()
    toast.success(darkMode ? 'Light mode enabled' : 'Dark mode enabled')
  }

  const creditPercentage = Math.min((credits / 10) * 100, 100)

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground">Settings</h2>
        <p className="text-muted-foreground mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      {/* ── Profile Card ─────────────────────────────── */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-sm mb-6 hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 bg-primary/10 rounded-lg">
            <User className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-semibold text-lg text-card-foreground">Profile Information</h3>
        </div>
        <Separator className="mb-6" />

        <div className="flex flex-col md:flex-row gap-8">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative group">
              {user?.Picture ? (
                <Image
                  src={user.Picture}
                  alt="Profile"
                  width={96}
                  height={96}
                  className="rounded-full ring-4 ring-primary/20 object-cover h-24 w-24"
                />
              ) : (
                <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center ring-4 ring-primary/20">
                  <User className="h-10 w-10 text-primary" />
                </div>
              )}
              <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center cursor-pointer">
                <Camera className="h-6 w-6 text-white" />
              </div>
            </div>
            <span className="text-xs text-muted-foreground">Synced from Google</span>
          </div>

          {/* Form fields */}
          <div className="flex-1 space-y-5">
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
                Full Name
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="bg-muted/50 border-border focus:bg-card transition-colors"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
                Email Address
              </label>
              <div className="relative">
                <Input
                  value={email}
                  disabled
                  className="bg-muted border-border text-muted-foreground pr-24"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" /> Verified
                </span>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={handleSaveProfile}
                disabled={isSaving || name === user?.Name}
                className="gap-2"
              >
                <Save className="h-4 w-4" />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats & Credits Row ─────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Credits */}
        <div className="bg-card rounded-xl border border-border p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-amber-50 dark:bg-amber-900/30 rounded-lg">
                <Sparkles className="h-4 w-4 text-amber-500" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Credits Left</span>
            </div>
            <span className="text-2xl font-bold text-primary">{credits}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 mb-2">
            <div
              className="bg-primary rounded-full h-2 transition-all duration-500"
              style={{ width: `${creditPercentage}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">{credits} of 10 free credits remaining</p>
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-3 text-primary border-primary/30 hover:bg-primary/5"
            onClick={() => router.push('/billing')}
          >
            <CreditCard className="h-3.5 w-3.5 mr-1.5" />
            Upgrade Plan
          </Button>
        </div>

        {/* Interviews Created */}
        <div className="bg-card rounded-xl border border-border p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <CheckCircle className="h-4 w-4 text-blue-500" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Interviews</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{interviewCount}</p>
          <p className="text-xs text-muted-foreground mt-1">Total interviews created</p>
        </div>

        {/* Member Since */}
        <div className="bg-card rounded-xl border border-border p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
              <Clock className="h-4 w-4 text-purple-500" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Member Since</span>
          </div>
          <p className="text-base font-semibold text-foreground">
            {memberSince || 'Loading...'}
          </p>
          <p className="text-xs text-muted-foreground mt-1">Account creation date</p>
        </div>
      </div>

      {/* ── Account & Security ────────────────────────── */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-sm mb-6 hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-semibold text-lg text-card-foreground">Account & Security</h3>
        </div>
        <Separator className="mb-5" />

        <div className="space-y-1">
          {/* Auth Provider */}
          <div className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Authentication Provider
                </p>
                <p className="text-xs text-muted-foreground">
                  Signed in with Google OAuth
                </p>
              </div>
            </div>
            <span className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full font-medium">
              Google
            </span>
          </div>

          {/* Account Status */}
          <div className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Account Status
                </p>
                <p className="text-xs text-muted-foreground">
                  Your account is active and verified
                </p>
              </div>
            </div>
            <span className="text-xs bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 px-3 py-1 rounded-full font-medium flex items-center gap-1">
              <span className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse" />
              Active
            </span>
          </div>

          {/* Plan */}
          <div className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
               onClick={() => router.push('/billing')}>
            <div className="flex items-center gap-3">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Current Plan
                </p>
                <p className="text-xs text-muted-foreground">
                  Free tier — {credits} credits remaining
                </p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* ── Preferences ───────────────────────────────── */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-sm mb-6 hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Bell className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-semibold text-lg text-card-foreground">Preferences</h3>
        </div>
        <Separator className="mb-5" />

        <div className="space-y-1">
          {/* Email Notifications */}
          <div className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Email Notifications
                </p>
                <p className="text-xs text-muted-foreground">
                  Receive updates about interviews and results
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setEmailNotifications(!emailNotifications)
                toast.success(
                  emailNotifications
                    ? 'Email notifications disabled'
                    : 'Email notifications enabled'
                )
              }}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                emailNotifications ? 'bg-primary' : 'bg-muted-foreground/30'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 shadow-sm ${
                  emailNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Dark Mode */}
          <div className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              {darkMode ? (
                <Moon className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Sun className="h-4 w-4 text-muted-foreground" />
              )}
              <div>
                <p className="text-sm font-medium text-foreground">
                  Dark Mode
                </p>
                <p className="text-xs text-muted-foreground">
                  Toggle dark mode appearance
                </p>
              </div>
            </div>
            <button
              onClick={handleDarkModeToggle}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                darkMode ? 'bg-primary' : 'bg-muted-foreground/30'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 shadow-sm ${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* ── Danger Zone ───────────────────────────────── */}
      <div className="bg-card rounded-xl border border-red-200 dark:border-red-900/50 p-6 shadow-sm mb-10 hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 bg-red-50 dark:bg-red-900/30 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-red-500" />
          </div>
          <h3 className="font-semibold text-lg text-red-600 dark:text-red-400">Danger Zone</h3>
        </div>
        <Separator className="mb-5 bg-red-100 dark:bg-red-900/30" />

        <div className="space-y-4">
          {/* Sign Out */}
          <div className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-red-50/50 dark:hover:bg-red-900/20 transition-colors">
            <div className="flex items-center gap-3">
              <LogOut className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">Sign Out</p>
                <p className="text-xs text-muted-foreground">
                  Sign out of your account on this device
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-red-500 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600"
              onClick={handleSignOut}
            >
              <LogOut className="h-3.5 w-3.5 mr-1.5" />
              Sign Out
            </Button>
          </div>

          {/* Delete Account */}
          <div className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-red-50/50 dark:hover:bg-red-900/20 transition-colors">
            <div className="flex items-center gap-3">
              <Trash2 className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Delete Account
                </p>
                <p className="text-xs text-muted-foreground">
                  Permanently delete your account and all data
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-red-500 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600"
              onClick={() => toast.error('Please contact support to delete your account')}
            >
              <Trash2 className="h-3.5 w-3.5 mr-1.5" />
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
