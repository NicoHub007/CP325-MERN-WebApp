function TextInput({ state, setState }) {
    return (
        <input
            type='text'
            value={state}
            onChange={(evt) => setState(evt.target.value)}
            placeholder='Enter New Order Here...'
        />
    )
};

export default TextInput