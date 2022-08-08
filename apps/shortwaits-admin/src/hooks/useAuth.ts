import { useMemo } from "react"
import { useSelector } from "react-redux"
import { selectCurrentAuthState } from "@/redux/auth"

export const useAuth = () => {
  const auth = useSelector(selectCurrentAuthState)
  return useMemo(() => auth, [auth])
}
