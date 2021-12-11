import { useEffect, useState } from "react"
import { createList, updateList } from "./UsefulActions.js"

export const useTitle = (title) => {
    useEffect(() => document.title = "App | " + title, [title])
}

export const useUpdater = (dispatch) => {
    useEffect(() => {
        createList(dispatch)
        let lastcall = new Date()
        const clock = setInterval(() => {
            updateList(lastcall, dispatch)
            lastcall = new Date()
        }, 2000)
        return () => {
            window.clearInterval(clock)
        }
    }, [dispatch])
}

export const useForm = (initValues) => {
    const [values, setValues] = useState(initValues)
    const updateValues = ({ target }) => {
        setValues(prevValues => ({...prevValues, [target.name]: target.value}))
    }
    return [values, updateValues]
}