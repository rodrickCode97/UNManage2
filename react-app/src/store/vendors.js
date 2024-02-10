

const CREATE = "vendor/CREATE";
const UPDATE = 'vendor/UPDATE';
const READ = 'vendor/READ';
const DELETE = "vendor/DELETE";

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

export const createVendor = (payload) => async (dispatch) => {
    try {
        const res = await fetch(`/api/vendors`, {
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

export const readVendor = (payload) => async (dispatch) => {
    const res = await fetch(`/api/vendors`);
    if (res.ok) {
        const data = await res.json();
        dispatch(read(data));
        return data;
    }
    return res;
}

export const updateVendor = (vendor_id, payload) => async (dispatch) => {
    try {
        const res = await fetch(`/api/vendors/${vendor_id}`, {
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

export const deleteVendor = (vendor_id) => async (dispatch) => {
        const res = await fetch(`/api/vendors/${vendor_id}`,{method: "DELETE"});
        if (res.ok) {
            const data = await res.json();
            dispatch(deleted(vendor_id)) //might be data if error
            return data
        }
        return res;
}

const initState = {};

const vendorReducer = (state = initState, action) => {
    switch (action.type) {
        case CREATE:
            const id = action.payload.id;
            const newObj = { ...state };
            newObj.vendors[id] = action.payload;
            return newObj;
        case READ:
            if (action.type) {
                return {...state, vendors: {...action.payload}}
            } else {
                return {...state}
            }
          
        case UPDATE:
            const vendor_id = action.payload.id
            const newState = { ...state };
            newState.vendors[vendor_id] = action.payload;
            return newState
        case DELETE:
            const new_state = { ...state };
            delete new_state.vendors[action.vendor_id];
            return new_state;
        default:
            return state;
            
    }
}
export default vendorReducer;