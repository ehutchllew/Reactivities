import { action, computed, makeObservable, observable } from "mobx";
import { createContext } from "react";
import { ActivitiesService } from "../api/agent";

class ActivityStore {
    activityRegistry = new Map();
    editMode = false;
    loadingIndicator = false;
    selectedActivity = null;
    submitting = false;
    target = "";

    constructor() {
        makeObservable(this, {
            activitiesByDate: computed,
            activityRegistry: observable,
            cancelFormOpen: action,
            cancelSelectedActivity: action,
            createActivity: action,
            deleteActivity: action,
            editActivity: action,
            editMode: observable,
            loadActivities: action,
            loadingIndicator: observable,
            openCreateForm: action,
            openEditForm: action,
            selectActivity: action,
            selectedActivity: observable,
            submitting: observable,
            target: observable,
        });
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistry.values())
            .slice()
            .sort((a, b) => {
                return Date.parse(a.date) - Date.parse(b.date);
            });
    }

    cancelFormOpen = () => {
        this.editMode = false;
    };

    cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    };

    createActivity = async (activity) => {
        this.submitting = true;
        try {
            await ActivitiesService.create(activity);
            this.activityRegistry.set(activity.id, activity);
        } catch (e) {
            console.error(e);
        } finally {
            this.editMode = false;
            this.submitting = false;
        }
    };

    deleteActivity = async (event, id) => {
        this.submitting = true;
        this.target = event.currentTarget.name;

        try {
            await ActivitiesService.delete(id);
            this.activityRegistry.delete(id);
        } catch (e) {
            console.error(e);
        } finally {
            this.submitting = false;
            this.target = "";
        }
    };

    editActivity = async (activity) => {
        this.submitting = true;
        try {
            await ActivitiesService.update(activity);
            this.activityRegistry.set(activity.id, activity);
            this.selectedActivity = activity;
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
                this.activityRegistry.set(activity.id, activity);
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

    openEditForm = (id) => {
        this.selectedActivity = this.activityRegistry.get(id);
        this.editMode = true;
    };

    selectActivity = (id) => {
        this.selectedActivity = this.activityRegistry.get(id);
        this.editMode = false;
    };
}

export const ActivityContext = createContext(new ActivityStore());
