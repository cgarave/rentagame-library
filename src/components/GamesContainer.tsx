export const GamesContainer = async ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className="mt-30 grid grid-cols-5 gap-3 px-40">
                {children}
            </div>
        </>
    )
}