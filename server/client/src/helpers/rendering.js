//conditional render based on whether a transaction is resolved or not
export const isResolved = (item) => {
  if (item.share && item.resolved) {
    return (
      <div className="lg:border-2 md:border-green-400 text-green-400  w-3/4 rounded-md">
        resolved
      </div>
    );
  } else if (item.share && !item.resolved) {
    return (
      <div className="lg:border-2 md:border-primary text-primary w-3/4 rounded-md">
        unresolved
      </div>
    );
  } else {
    return <div>resolved</div>;
  }
};

//variation on above for the household expenses, where the value of 'share' is not returned from the req so must be removed from conditional check
export const isHouseholdResolved = (item) => {
  if (item.resolved) {
    return (
      <div className="lg:border-2 md:border-green-400 text-green-400  w-3/4 rounded-md">
        resolved
      </div>
    );
  } else if (!item.resolved) {
    return (
      <div className="lg:border-2 md:border-primary text-primary w-3/4 rounded-md">
        unresolved
      </div>
    );
  } else {
    return <div>resolved</div>;
  }
};


export const checkOwner = (item, id) => {
  if (item.creator === id) {
    return <div className="text-green-400" >created</div>
  } else {
    return <div className="text-primary">not created</div>
  }

} 

//convert the date from format stored on the database to day-month-year
export const reverseDate = (date) => {
  const dateArray = date.split('-');
  dateArray.reverse();
  return dateArray.join('-');
};
