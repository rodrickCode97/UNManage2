

const CREATE = "profile/CREATE";
const UPDATE = 'profile/UPDATE';
const READ = 'profile/READ';
const DELETE = "profile/DELETE";

const create = (payload) => ({
    type: CREATE,
    payload,
});


const read = (payload) => ({
    type: READ,
    payload
})

const update = (payload) => ({
        type: UPDATE,
        payload
})

const deleted = (payload) => ({
    type: DELETE,
    payload
})

export const createProfile = (payload) => async (dispatch) => {
    console.log(payload)
    try {
        const res = await fetch(`/api/profiles`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        if (res.ok) {
            const data = await res.json();
            dispatch(create(data));
            return data;
        }
        return res;
    } catch (error) {
        const res = await error.json();
        throw res;
}
}

export const readProfile = () => async (dispatch) => {
  
        const res = await fetch(`/api/profiles`);
        if (res.ok) {
            const data = await res.json();
            dispatch(read(data));
            return data;
        }
        return res;
        
   
}

export const updateProfile = (profile_id, payload) => async (dispatch) => {
    try {
        const res = await fetch(`/api/profiles/${profile_id}`, {
            method: "PUT",
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(payload)
        });
        if (res.ok) {
            const data = await res.json();
            dispatch(update(data))
            return data
        }
        return res;
    } catch (error) {
        const res = await error.json();
        throw res;
    }
}

export const deleteProfile = (profile_id) => async (dispatch) => {
    console.log(profile_id)
        const res = await fetch(`/api/profiles/${profile_id}`,{method: "DELETE"});
        if (res.ok) {
            const data = await res.json();
           
            dispatch(deleted(profile_id)) //might be data if error
            return data
        }
        return res;
}

const initState = {};

const ProfileReducer = (state = initState, action) => {
    switch (action.type) {
        
        case CREATE:
            const id = action.payload.id;
            const newObj = { ...state };
            newObj.profiles[id] = action.payload;
            return newObj;
        case READ:
            if (action.type) {
                return {...state, profiles: {...action.payload}}
            } else {
                return {...state}
            }
            case UPDATE:
            const profile_id = action.payload.id;
            const newState = { ...state };
            newState.profiles[profile_id -1] = action.payload;
            return newState
        case DELETE:
            const new_state = { ...state };
            delete new_state.profiles[action.payload];
            return new_state;
        default:
            return state;
            
    }
}
export default ProfileReducer;