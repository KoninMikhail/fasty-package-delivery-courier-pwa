export const NavbarDesktop = () => {
    return (
        <header>
            <div className="grid grid-cols-[max-content_auto_max-content] justify-between">
                <div>logo</div>
                <div>
                    <nav className="flex gap-3">
                        <a href="#">orders</a>
                        <a href="#">map</a>
                        <a href="#">profile</a>
                    </nav>
                </div>
                <div>profile</div>
            </div>
        </header>
    );
};
