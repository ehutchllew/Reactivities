import { action, computed, makeObservable, observable } from "mobx";
import { createContext } from "react";
import { ActivitiesService } from "../api/agent";

class ActivityStore {
    activities = [];
    editMode = false;
    loadingIndicator = false;
    selectedActivity = null;
    submitting = false;

    constructor() {
        makeObservable(this, {
            activities: observable,
            activitiesByDate: computed,
            createActivity: action,
            editMode: observable,
            loadActivities: action,
            loadingIndicator: observable,
            openCreateForm: action,
            selectActivity: action,
            selectedActivity: observable,
            submitting: observable,
        });
    }

    get activitiesByDate() {
        return this.activities.slice().sort((a, b) => {
            return Date.parse(a.date) - Date.parse(b.date);
        });
    }

    createActivity = async (activity) => {
        this.submitting = true;
        try {
            await ActivitiesService.create(activity);
            this.activities.push(activity);
        } catch (e) {
            console.error(e);
        } finally {
            this.editMode = false;
            this.submitting = false;
        }
    };

    loadActivities = async () => {
        this.loadingIndicator = true;
        try {
            const resp = await ActivitiesService.list();
            const json = await resp.json();
            json.forEach((activity) => {
                activity.date = activity.date.split(".")[0];
                this.activities.push(activity);
            });
        } catch (e) {
            console.error(e);
        } finally {
            this.loadingIndicator = false;
        }
    };

    openCreateForm = () => {
        this.editMode = true;
        this.selectedActivity = undefined;
    };

    selectActivity = (id) => {
        this.selectedActivity = this.activities.find(
            (activity) => activity.id == id
        );
        this.editMode = false;
    };
}

export const ActivityContext = createContext(new ActivityStore());
