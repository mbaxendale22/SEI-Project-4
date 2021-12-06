//conditional render based on whether a transaction is resolved or not
export const isResolved = (item) => {
  if (item.share && item.resolved) {
    return (
      <div className="md:border-2 md:border-green-400 text-green-400  w-3/4 rounded-md">
        resolved
      </div>
    );
  } else if (item.share && !item.resolved) {
    return (
      <div className="md:border-2 md:border-primary text-primary w-3/4 rounded-md">
        unresolved
      </div>
    );
  } else {
    return <div>resolved</div>;
  }
};

//convert the date from format stored on the database to day-month-year
export const reverseDate = (date) => {
  const dateArray = date.split('-');
  dateArray.reverse();
  return dateArray.join('-');
};
