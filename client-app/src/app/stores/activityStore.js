import { makeObservable, observable } from 'mobx';
import { createContext } from 'react'

class ActivityStore {
   title = "Hello from mobx";
   constructor(){
       makeObservable(this, {
           title: observable
       })
   }
}

export const ActivityContext = createContext(new ActivityStore())