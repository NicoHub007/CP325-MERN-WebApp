function ActionButton({ children, dispatch, type, payload, disabled }) {
    return (
        <button
            onClick={() => dispatch({ type: type, payload: payload })}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export default ActionButton;
