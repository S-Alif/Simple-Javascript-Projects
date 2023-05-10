import {api_easy} from './constants.js'
import {api_medium} from './constants.js'
import {api_hard} from './constants.js'

// get the easy questions
const get_data_easy = async () => {
    try {
        let res = await fetch(`${api_easy}`)
        let data = await res.json()

        return data
    } catch (error) {
        console.log("error", error)        
    }
}

// get the easy questions
const get_data_medium = async () => {
    try {
        let res = await fetch(`${api_medium}`)
        let data = await res.json()

        return data
    } catch (error) {
        console.log("error", error)        
    }
}

// get the easy questions
const get_data_hard = async () => {
    try {
        let res = await fetch(`${api_hard}`)
        let data = await res.json()

        return data
    } catch (error) {
        console.log("error", error)        
    }
}

export{get_data_easy, get_data_medium, get_data_hard}