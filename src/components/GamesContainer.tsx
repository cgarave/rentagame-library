export const GamesContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className="grid grid-cols-3 xl:grid-cols-5 gap-3">
                {children}
            </div>
        </>
    )
}