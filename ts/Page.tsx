type PageProps = {
    children: React.ReactNode;
    withNavBar?: boolean;
    pageStyle?: 'content' | 'list';
};

export default function Page(props: PageProps){
    const { children, withNavBar = true, pageStyle = 'content' } = props;
    console.log(pageStyle);

    const maybeNavBar = withNavBar ? <NavBar/> : undefined;

    return (
        <div style={{backgroundColor: 'red'}}>
            {maybeNavBar}
            {children}
        </div>
    );
};

function NavBar() {
    return (
        <div style={{backgroundColor: 'green', height: '20px', width: '100%'}}></div>
    );
}