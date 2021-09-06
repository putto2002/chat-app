import classes from '../../styles/Global.module.scss';
const Container = (props) => {
    return (
        <div className={classes.container}>
            {props.children}
        </div>
    )
}

export default Container;