import { action, makeObservable, observable } from 'mobx';
import { createContext } from 'react'
import { ActivitiesService } from '../api/agent';

class ActivityStore {
   activities = [];
   editMode = false;
   loadingIndicator = false;
   selectedActivity = null;

   constructor(){
       makeObservable(this, {
           activities: observable,
           editMode: observable,
           loadActivities: action,
           loadingIndicator: observable,
           selectActivity: action,
           selectedActivity: observable,
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

   selectActivity = (id) => {
       this.selectedActivity = this.activities.find(activity => activity.id == id);
       this.editMode = false;
   }
}

export const ActivityContext = createContext(new ActivityStore())