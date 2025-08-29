import { useHealth } from "./shared/hooks/useHealth"

function App() {
  const { checkHealth } = useHealth()

  const onCheckHealth = async () => {
    const data = await checkHealth()
    console.log('message: ', data.running)
  }

  return (
    <button onClick={() => onCheckHealth()}>Req</button>
  )
}

export default App
