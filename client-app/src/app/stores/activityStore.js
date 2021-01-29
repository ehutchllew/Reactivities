import { action, makeObservable, observable } from 'mobx';
import { createContext } from 'react'
import { ActivitiesService } from '../api/agent';

class ActivityStore {
   activities = [];
   loadingIndicator = false;
   constructor(){
       makeObservable(this, {
           activities: observable,
           loadActivities: action,
           loadingIndicator: observable
       })
   }

   loadActivities = () => {
       this.loadingIndicator = true;
       ActivitiesService.list()
    .then(response => response.json())
    .then(json => {
      json.forEach(activity => {
        activity.date = activity.date.split('.')[0]
        this.activities.push(activity);
      })
    })
    .finally(() => this.loadingIndicator=false)
   }
}

export const ActivityContext = createContext(new ActivityStore())