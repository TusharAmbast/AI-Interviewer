import React from 'react'


function QuestionListContainer({ questionList }) {
  return (
    <div>
        <div className='mt-5 p-5 border border-gray-300 rounded-xl'>
                {questionList.map((item, index) => (
                    <div key={index} className='mt-5 p-5 rounded-lg border border-white bg-blue-50'>
                        <h3 className='font-medium'>Q{index + 1}: {item.question}</h3>
                        <h3 className='text-sm text-muted-foreground'>Type: {item.type}</h3>
                </div>
                ))}
            </div>
        
    </div>
  )
}

export default QuestionListContainer