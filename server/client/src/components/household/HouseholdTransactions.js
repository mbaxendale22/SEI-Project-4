import React, { useState } from 'react'
import { useQueryClient, useQuery } from 'react-query'
import {
  checkOwner,
  isHouseholdResolved,
  reverseDate,
} from '../../helpers/rendering'
import { getRecentHouseExpenses } from '../../lib/api/household.js'
const HouseholdTransactions = ({ householdInfo }) => {
  const [showUnresolved, setShowUnresolved] = useState(false)
  const [showBill, setShowBill] = useState(false)
  const [showOwed, setShowOwed] = useState(false)
  const queryClient = useQueryClient()

  const { id } = queryClient.getQueryData(['userData'])

  const {
    data: recent,
    isError: errors,
    isLoading: loading,
  } = useQuery('houseExpenses', () => getRecentHouseExpenses(householdInfo.id))

  if (loading) return <p>loading household expenses...</p>
  if (errors) return <p>Something has gone wrong please try again later</p>
  const onlyUnresolved = recent.filter((ex) => !ex.resolved)
  const checkMyBill = () => {
    const billArray = []
    const notCreated = recent.filter((ex) => {
      return ex.creator !== id && !ex.resolved
    })
    if (notCreated.length === 0) {
      return 0
    } else {
      notCreated.forEach((ex) => billArray.push(Number(ex.amount)))
      const total = billArray.reduce((x, y) => x + y)
      return total / 2
    }
  }
  const checkWhatIAmOwed = () => {
    const billArray = []
    const created = recent.filter((ex) => {
      return ex.creator === id && !ex.resolved
    })
    if (created.length === 0) {
      return 0
    } else {
      created.forEach((ex) => billArray.push(Number(ex.amount)))
      const total = billArray.reduce((x, y) => x + y)
      return total / 2
    }
  }

  return (
    <section className="h-full flex flex-col justify-evenly">
      {!showUnresolved ? (
        <>
          <h2 className="text-center py-3">Recent Household Expenses</h2>
          <div className="grid grid-cols-1 gap-1 justify-items-center sm:grid-cols-6 h-48 sm:max-h-64 sm:h-full overflow-x-scroll sm:gap-2 text-center border-2 border-b">
            {recent?.map((item) => {
              return (
                <>
                  <div key={recent.id}>{reverseDate(item.date)}</div>
                  <div>{item.name}</div>
                  <div>
                    {item.category === 'entertainment' ? (
                      <p>ent</p>
                    ) : (
                      item.category
                    )}
                  </div>
                  <div>£{item.amount}</div>
                  {checkOwner(item, id)}
                  {isHouseholdResolved(item)}
                  <hr className="border-t-2 border-dotted w-3/4 border-primary rounded-3xl my-4 sm:hidden" />
                </>
              )
            })}
          </div>
          <div className="flex gap-4">
            <div
              onClick={() => setShowOwed(!showOwed)}
              className="text-green-400 border-2 border-green-400 m-auto my-2 rounded-md hover:shadow-md transform duration-300 ease-in-out hover:-translate-x-1 p-2 text-center w-1/3 cursor-pointer"
            >
              {showOwed ? (
                <p>You're owed £{checkWhatIAmOwed()}</p>
              ) : (
                <p>show me what I'm owed</p>
              )}
            </div>
            <div
              onClick={() => setShowUnresolved(true)}
              className="border-2 m-auto my-2 border-gray-400 rounded-md hover:shadow-md transform duration-300 ease-in-out hover:-translate-x-1 p-2 text-center w-1/3 cursor-pointer"
            >
              show only unresolved expenses
            </div>
            <div
              onClick={() => setShowBill(!showBill)}
              className="border-2 m-auto my-2 border-primary text-primary rounded-md hover:shadow-md transform duration-300 ease-in-out hover:-translate-x-1 p-2 text-center w-1/3 cursor-pointer"
            >
              {showBill ? (
                <p>You owe £{checkMyBill()}</p>
              ) : (
                <p>show me what I owe</p>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-center py-3">Recent Household Expenses</h2>
          <div className="grid grid-cols-1 gap-1 justify-items-center sm:grid-cols-6 h-48 sm:max-h-64 sm:h-full overflow-x-scroll sm:gap-2 text-center border-2 border-b">
            {onlyUnresolved?.map((item) => {
              return (
                <>
                  <div key={recent.id}>{reverseDate(item.date)}</div>
                  <div>{item.name}</div>
                  <div>
                    {item.category === 'entertainment' ? (
                      <p>ent</p>
                    ) : (
                      item.category
                    )}
                  </div>
                  <div>£{item.amount}</div>
                  {checkOwner(item, id)}
                  {isHouseholdResolved(item)}
                  <hr className="border-t-2 border-dotted w-3/4 border-primary rounded-3xl my-4 sm:hidden" />
                </>
              )
            })}
          </div>
          <div className="flex gap-4">
            <div
              onClick={() => setShowOwed(!showOwed)}
              className="text-green-400 border-2 border-green-400 m-auto my-2 rounded-md hover:shadow-md transform duration-300 ease-in-out hover:-translate-x-1 p-2 text-center w-1/3"
            >
              {showOwed ? (
                <p>You're owed £{checkWhatIAmOwed()}</p>
              ) : (
                <p>show me what I'm owed</p>
              )}
            </div>
            <div
              onClick={() => setShowUnresolved(false)}
              className="border-2 m-auto my-2 border-gray-400 rounded-md hover:shadow-md transform duration-300 ease-in-out hover:-translate-x-1 p-2 text-center w-1/3"
            >
              show all expenses
            </div>
            <div
              onClick={() => setShowBill(!showBill)}
              className="border-2 m-auto my-2 border-primary text-primary rounded-md hover:shadow-md transform duration-300 ease-in-out hover:-translate-x-1 p-2 text-center w-1/3"
            >
              {showBill ? (
                <p>You owe £{checkMyBill()}</p>
              ) : (
                <p>show me what I owe</p>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  )
}

export default HouseholdTransactions
