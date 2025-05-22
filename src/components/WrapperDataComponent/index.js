import Loading from "../Loading";
import { Error } from "../Error"

export const WrapperDataComponent = ({ tryAgain, isLoading, hasError, errorMessage, children }) => {
    return (
        <>
            {!isLoading && !hasError ? (
                <>{children}</>
            ) : (
                <>
                    {isLoading && <Loading />}

                    {!isLoading && hasError && (
                        <Error tryAgain={tryAgain} message={errorMessage} />
                    )}
                </>
            )}
        </>
    )
}