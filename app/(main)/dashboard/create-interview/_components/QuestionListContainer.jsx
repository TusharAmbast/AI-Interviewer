import React from 'react'


function QuestionListContainer({ questionList }) {
  return (
    <div>
        <div className='mt-5 p-5 border border-border bg-card rounded-xl shadow-sm'>
                {questionList.map((item, index) => (
                    <div key={index} className='mt-5 p-5 rounded-lg border border-border bg-muted/50'>
                        <h3 className='font-medium text-foreground'>Q{index + 1}: {item.question}</h3>
                        <h3 className='text-sm text-muted-foreground mt-2'>Type: {item.type}</h3>
                </div>
                ))}
            </div>
        
    </div>
  )
}

export default QuestionListContainer