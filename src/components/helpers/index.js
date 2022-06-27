// prepopolate integer array with integers.
function baseArray(n=10) {
    let t = []
    for(let i= 0; i<n; i++){
        t[i] = i+1
    }
    return t;
}


function shuffle([...array]) {
    
    let m = array.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
        
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    
    return array;
}

export function primaLaSceltaDellaSede(data, max, field) {
 
  if(!field){
    alert("Attenzione! Prima devi scegliere il campo di raggruppamento, per usare questo algoritmo.")
    return null
  }

  const FieldList = groupBy(field)
  const keys = Object.keys(FieldList(data))
  
  const ArraySeggi = []
  for(const key of keys) ArraySeggi[`${key}`] = []

  // clear selected group everywhere
  data.map( item => {
    item.selectedGroup = ""
    return item
  })


  const num = keys.length * max

  data.slice(0,num).map( item => {
      if(ArraySeggi[item[field]].length < max)
      {
        item.selectedGroup = item[field]
        ArraySeggi[item[field]].push(item)
      }
    return item
  })

  keys.map(
    (p)=> data.slice(0,num).map( item => {
      if(!item.selectedGroup && ArraySeggi[p].length < max){
      ArraySeggi[p].push(item)
        item.selectedGroup = [p]
    }
    return item
  })

 )

  return {data: data, elenco: ArraySeggi}
}

export function ilPrimoVince(data, max, seggi) {
  const ArraySeggi = []
  for(let i=0; i<seggi; i++) ArraySeggi[`Seggio ${i+1}`] = []

  // clear selected group everywhere
  data.map( item => {
    item.selectedGroup = ""
    return item
  })

  const num = seggi * max

  Object.keys(ArraySeggi).map((p)=> 
    data.slice(0,num).map( item =>{
      if(!item.selectedGroup && ArraySeggi[p].length < max){
        ArraySeggi[p].push(item)
        item.selectedGroup = [p]
      }
      return item
    })
  )   

  return {data: data, elenco: ArraySeggi}
}

// Dato un peso per ogni seggio 
// si accumulano i vincitori in base al peso del seggio
export function seggiPesati(data, max, field) {

  if(!field){
    alert("Attenzione! Prima devi scegliere il campo di raggruppamento, per usare questo algoritmo.")
    return null
  }

  const FieldList = groupBy(field)
  const keys = Object.keys(FieldList(data))
  
  const ArraySeggi = []
  for(const key of keys) ArraySeggi[`${key}`] = []

  // clear selected group everywhere
  data.map( item => {
    item.selectedGroup = ""
    return item
  })

// numWinners = numero di vincitori totali
  const numWinners = keys.length * max

  data.slice(0,numWinners).map( item => {
      if(ArraySeggi[item[field]].length < max)
      {
        item.selectedGroup = item[field]
        ArraySeggi[item[field]].push(item)
      }
    return item
  })

  keys.map(
    (destination)=> data.slice(0,numWinners).map( item => {
      if(!item.selectedGroup && ArraySeggi[destination].length < max){
      ArraySeggi[destination].push(item)
        item.selectedGroup = [destination]
    }
    return item
  })
 )

  return {data: data, elenco: ArraySeggi}
}

const groupBy = key => array =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});

export {baseArray, groupBy}
export default shuffle;
