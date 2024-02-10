

const CREATE = "lab/CREATE";
const UPDATE = 'lab/UPDATE';
const READ = 'lab/READ';
const DELETE = "lab/DELETE";

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

export const createLab = (payload) => async (dispatch) => {
    try {
        console.log(payload)
        const res = await fetch(`/api/labs`, {
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

export const readLab = (payload) => async (dispatch) => {
    const res = await fetch(`/api/labs`);
    if (res.ok) {
        const data = await res.json();
        dispatch(read(data));
        return data;
    }
    return res;
}

export const updateLab = (lab_id, payload) => async (dispatch) => {
    try {
        console.log(payload)
        const res = await fetch(`/api/labs/${lab_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
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

export const deleteLab = (lab_id) => async (dispatch) => {
        const res = await fetch(`/api/labs/${lab_id}`,{method: "DELETE"});
        if (res.ok) {
            const data = await res.json();
            dispatch(deleted(lab_id)) //might be data if error
            return data
        }
        return res;
}

const initState = {};

const labReducer = (state = initState, action) => {
    switch (action.type) {
        case CREATE:
            const id = action.payload.id;
            const newObj = { ...state };
            newObj.labs[id] = action.payload;
            return newObj;
        case READ:
            const currLab = {};
            if (action.type) {
                const lab = action.payload;
                if (!lab) return { ...state };
                return {...state, labs: {...action.payload} }
            } else {
                return {...state, lab: {...currLab}}
            }
        case UPDATE:
            const lab_id = action.payload.id;
            const newState = { ...state };
            newState.labs[lab_id] = action.payload;
            return newState
        case DELETE:
            console.log(action)
            const new_state = { ...state };
            delete new_state.labs[action.payload];
            return new_state;
        default:
            return state;
            
    }
}
export default labReducer;