import {
    action,
    computed,
    configure,
    makeObservable,
    observable,
    runInAction,
} from "mobx";
import { createContext } from "react";
import { ActivitiesService } from "../api/agent";

configure({ enforceActions: "always" });

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
            clearActivity: action,
            createActivity: action,
            deleteActivity: action,
            editActivity: action,
            editMode: observable,
            loadActivities: action,
            loadActivity: action,
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
        return this.groupActivitiesByDate(
            Array.from(this.activityRegistry.values())
        );
    }

    cancelFormOpen = () => {
        this.editMode = false;
    };

    cancelSelectedActivity = () => {
        this.selectedActivity = null;
    };

    clearActivity = () => {
        this.selectedActivity = null;
    };

    createActivity = async (activity) => {
        this.submitting = true;
        try {
            await ActivitiesService.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
            });
        } catch (e) {
            console.error(e);
        } finally {
            runInAction(() => {
                this.editMode = false;
                this.submitting = false;
            });
        }
    };

    deleteActivity = async (event, id) => {
        this.submitting = true;
        this.target = event.currentTarget.name;

        try {
            await ActivitiesService.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
            });
        } catch (e) {
            console.error(e);
        } finally {
            runInAction(() => {
                this.submitting = false;
                this.target = "";
            });
        }
    };

    editActivity = async (activity) => {
        this.submitting = true;
        try {
            await ActivitiesService.update(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
            });
        } catch (e) {
            console.error(e);
        } finally {
            runInAction(() => {
                this.editMode = false;
                this.submitting = false;
            });
        }
    };

    //Helper Method
    getActivity = (id) => {
        return this.activityRegistry.get(id);
    };

    groupActivitiesByDate = (activities) => {
        const sortedActivities = activities.sort((a, b) => {
            return Date.parse(a.date) - Date.parse(b.date);
        });

        return Object.entries(
            sortedActivities.reduce((acc, currentVal) => {
                const date = currentVal.date.split("T")[0];
                acc[date] = acc[date]
                    ? [...acc[date], currentVal]
                    : [currentVal];
                return acc;
            }, {})
        );
    };

    loadActivities = async () => {
        this.loadingIndicator = true;
        try {
            const resp = await ActivitiesService.list();
            const json = await resp.json();
            runInAction(() => {
                json.forEach((activity) => {
                    activity.date = activity.date.split(".")[0];
                    this.activityRegistry.set(activity.id, activity);
                });
            });
        } catch (e) {
            console.error(e);
        } finally {
            runInAction(() => {
                this.loadingIndicator = false;
            });
        }
    };

    loadActivity = async (id) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.selectedActivity = activity;
        } else {
            this.loadingIndicator = true;
            try {
                activity = await ActivitiesService.details(id);
                runInAction(() => {
                    this.selectedActivity = activity;
                });
            } catch (e) {
                console.warn(e);
            } finally {
                runInAction(() => {
                    this.loadingIndicator = false;
                });
            }
        }
    };

    openCreateForm = () => {
        this.editMode = true;
        this.selectedActivity = null;
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
