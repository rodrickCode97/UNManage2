

const CREATE = "barrel/CREATE";
const UPDATE = 'barrel/UPDATE';
const READ = 'barrel/READ';
const DELETE = "barrel/DELETE";

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

export const createBarrel = (payload) => async (dispatch) => {
    try {
        const res = await fetch(`api/barrels`, {
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

export const readBarrel = (lab_id, payload) => async (dispatch) => {
    const res = await fetch(`api/${lab_id}/barrels`);
    if (res.ok) {
        const data = await res.json();
        dispatch(read(data));
        return data;
    }
    return res;
}

export const updateBarrel = (lab_id, barrel_id, payload) => async (dispatch) => {
    try {
        const res = await fetch(`api/labs/${lab_id}/barrels/${barrel_id}`, {
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

export const deleteBarrel = (lab_id, barrel_id) => async (dispatch) => {
        const res = await fetch(`api/labs/${lab_id}/barrels/${barrel_id}`,{method: "DELETE"});
        if (res.ok) {
            const data = await res.json();
            dispatch(deleted(barrel_id)) //might be data if error
            return data
        }
        return res;
}

const initState = { barrel: {} };

const barrelReducer = (state = initState, action) => {
    switch (action.type) {
        case CREATE:
            const id = action.payload.id;
            const newObj = { ...state };
            newObj.lists[id] = action.payload;
            return newObj;
        case READ:
            const currBarrel = {};
            if (action.type) {
                const barrel = action.barrel.barrels;
                if (!barrel) return { ...state };
                currBarrel[barrel[0].id] = barrel;
                return {...state, ...currBarrel}
            } else {
                return {...state, barrel: {...currBarrel}}
            }
        case UPDATE:
            const barrel_id = action.barrel.id;
            const newState = { ...state };
            newState.barrel[barrel_id] = action.payload;
            return newState
        case DELETE:
            const new_state = { ...state };
            delete new_state.barrel[action.barrel];
            return new_state;
        default:
            return state;
            
    }
}
export default barrelReducer;