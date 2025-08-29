import { Button } from "@/shared/components/ui/button"
import { useHealth } from "@/shared/hooks/useHealth"

function App() {
  const { checkHealth } = useHealth()

  const onCheckHealth = async () => {
    const data = await checkHealth()
    console.log('status: ', data.running)
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-amber-100">
      <Button onClick={() => onCheckHealth()}>Req</Button>
    </div>
  )
}

export default App
