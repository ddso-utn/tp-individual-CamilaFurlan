function Header({
    titulo,
    subtitulo,
    children
}) {

    return (

        <header className="header">

            <div className="header-content">

                <div>

                    <h1>

                        {titulo}

                    </h1>

                    {

                        subtitulo && (

                            <p>

                                {subtitulo}

                            </p>

                        )

                    }

                </div>

                {

                    children && (

                        <div className="header-actions">

                            {children}

                        </div>

                    )

                }

            </div>

        </header>

    );

}

export default Header;