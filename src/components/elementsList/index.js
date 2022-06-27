import React from 'react'
import {ListGroup,  ListGroupItem} from 'reactstrap'
import StoreContext from '../../store'
import {groupBy} from '../helpers'

export default function ElementsList ({data, label, shuffled=false, grouped=false,}) {

    const {config: {selected, field, visibilityFields, squared} }= React.useContext(StoreContext)


    // Grouped: Elementi raggruppati per un campo
    if(grouped){  
        const pressoGrouped = groupBy(field)
        const groups = pressoGrouped(data)
        const indexed = Object.keys(groups)

        return <>
            {indexed.map( (itemField) => {
                if(shuffled){
                    groups[itemField].map( (item,id) => {
                        if(id < selected){
                            item.selected = true
                        } else {
                            item.selected = false
                        }
                        return item
                    } )
                }

                const titolo =  itemField !== "undefined" ? itemField : "Elenco"
                return <>
                <h1>{titolo}</h1>
                <ListGroupItem key={titolo}>
                {groups[itemField].map( (item, idx) => {
                    const bold = item.selected === true ? 'font-weight-bold' : ""
                        return <ListGroupItem key={idx}>
                            <span className={bold}>{idx+1} - { visibilityFields.map( el => item[el.value] + " ")} {!!squared.length && <>[{item[squared]}]</>}</span>
                    </ListGroupItem>   
                })}
            </ListGroupItem>
            </>
            })}
        </>
    }
        

    // Elementi non raggruppati.
    if(shuffled){
        data.map( (item,idx) => {
            if(idx < selected){
                item.selected = true
            } else {
                item.selected = false
            }
            return item
        } )
    }
    
    return <>
        <h3>{label}</h3>
        <ListGroup>
            {data.map((item, idx ) => <ListGroupItem key={idx + Math.random(1)}>
                    <span className={item.selected === true ? 'font-weight-bold' : ""}>{idx+1} - { visibilityFields.map( el => item[el.value] + " ")} {!!squared.length && <>[{item[squared]}]</>}</span>
                </ListGroupItem>
            )}
        </ListGroup>
    </>
}