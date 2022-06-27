import React from 'react'

const defaultContext = {
    config: {},
    setConfig : () =>{}
}
const StoreContext = React.createContext(defaultContext)

export {defaultContext}
export default StoreContext
