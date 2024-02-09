

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
        const res = await fetch(`/api/labs`, {
            method: "POST",
            Headers: { "Content-Type": "application/json" },
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
        const res = await fetch(`/api/labs/${lab_id}`, {
            method: "PUT",
            Headers: { 'Content-Type': "application/json" },
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
            newObj.lists[id] = action.payload;
            return newObj;
        case READ:
            const currLab = {};
            if (action.type) {
                console.log(action)
                const lab = action.payload;
                if (!lab) return { ...state };
                return {...state, labs: {...action.payload} }
            } else {
                return {...state, lab: {...currLab}}
            }
        case UPDATE:
            const lab_id = action.lab.id;
            const newState = { ...state };
            newState.lab[lab_id] = action.payload;
            return newState
        case DELETE:
            const new_state = { ...state };
            delete new_state.lab[action.lab];
            return new_state;
        default:
            return state;
            
    }
}
export default labReducer;