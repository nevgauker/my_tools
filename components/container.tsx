export const Container = ({ children }: { children: React.ReactNode }) => {
    return (
      <main className='flex min-h-screen flex-col items-center p-2'>
        {children}
      </main>
    )
  }
  