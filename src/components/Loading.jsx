import React from "react";

const Loading = ({ loading, error, children }) => {
  console.log(children , 'chil');
  const elementType = children?.type?.render?.displayName;
  const renderHandler = () => {
    const buttonClone = React.cloneElement(
      children,
      { disabled: true },
      "loading..."
    );
    if (elementType === "Button") {
      return (
        <>
          {loading ? (
            buttonClone
          ) : error ? (
            <>
              {children}
              <p colSpan={3}>{error}</p>
            </>
          ) : (
            children
          )}
        </>
      );
    }
    return (
      <>
        {loading ? (
          <p colSpan={3}>'loading data....'</p>
        ) : error ? (
          <p colSpan={3}>{error}</p>
        ) : (
          children
        )}
      </>
    );
  };
  return renderHandler();
};

export default Loading;
