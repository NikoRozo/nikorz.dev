import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Link, StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

import { Navigation } from '.'
import config from '../../utils/siteConfig'

// Styles
import '../../styles/app.css'

/**
* Main layout component
*
* The Layout component wraps around each page and template.
* It also provides the header, footer as well as the main
* styles, and meta data for each page.
*
*/
const DefaultLayout = ({ data, children, bodyClass, isHome }) => {
    const site = data.allGhostSettings.edges[0].node
    const twitterUrl = site.twitter ? `https://twitter.com/${site.twitter.replace(/^@/, ``)}` : null
    const facebookUrl = site.facebook ? `https://www.facebook.com/${site.facebook.replace(/^\//, ``)}` : null

    return (
        <>
            <Helmet>
                <html lang={site.lang} />
                <style type="text/css">{`${site.codeinjection_styles}`}</style>
                <body className={bodyClass} />
            </Helmet>

            <div className="viewport">

                <div className="viewport-top">
                    {/* The main header section on top of the screen */}
                    <header className="site-head" style={{ ...site.cover_image && { backgroundImage: `url(${site.cover_image})` } }}>
                        <div className="container">
                            <div className="site-mast">
                                <div className="site-mast-left">
                                    <Link to="/">
                                        {site.logo ?
                                            <img className="site-logo" src={site.logo} alt={site.title} />
                                            : <Img fixed={data.file.childImageSharp.fixed} alt={site.title} />
                                        }
                                    </Link>
                                </div>
                                <div className="site-mast-right">
                                    { site.twitter && <a href={ twitterUrl } className="site-nav-item" target="_blank" rel="noopener noreferrer"><img className="site-nav-icon" src="/images/icons/twitter.svg" alt="Twitter" /></a>}
                                    { site.facebook && <a href={ facebookUrl } className="site-nav-item" target="_blank" rel="noopener noreferrer"><img className="site-nav-icon" src="/images/icons/facebook.svg" alt="Facebook" /></a>}
                                    <a className="site-nav-item" href={ `https://feedly.com/i/subscription/feed/${config.siteUrl}/rss/` } target="_blank" rel="noopener noreferrer"><img className="site-nav-icon" src="/images/icons/rss.svg" alt="RSS Feed" /></a>
                                </div>
                            </div>
                            { isHome ?
                                <div className="site-banner">
                                    <h1 className="site-banner-title">{site.title}</h1>
                                    <p className="site-banner-desc">{site.description}</p>
                                </div> :
                                null}
                            <nav className="site-nav">
                                <div className="site-nav-left">
                                    {/* The navigation items as setup in Ghost */}
                                    <Navigation data={site.navigation} navClass="site-nav-item" />
                                </div>
                                <div className="site-nav-right">
                                    <a className="site-nav-button" href={'https://cv.nikorz.dev/'} rel="noopener noreferrer">Mi Perfil</a>
                                </div>
                            </nav>
                        </div>
                    </header>

                    <main className="site-main">
                        { isHome ?
                        <div className="home_container">
                            <div className="home-full-content">
                                <div className="post-content-inner">
                                    {/* All the main content gets inserted here, index.js, post.js */}
                                    {children}
                                </div>
                                <div className="post-content-sidebar">
                                    <div className="home-description">
                                        <h2>Post Destacados ✨</h2>
                                        <p>
                                        Estaré informando y recopilando las actualizaciones a 
                                        los recursos publicados en los siguientes posts 👍🏻
                                        </p>
                                    </div>

                                    <div className="home-links">
                                        <Link to="/rompe-tus-limites">Rompe tus Limites!!!</Link><br/>
                                        <Link to="/aws">Todo de AWS</Link><br/>
                                        <Link to="/gcp">Todo de GCP</Link><br/>
                                        <Link to="/java">Todo de Java</Link><br/>
                                        <Link to="/docker">Todo de Docker</Link><br/>
                                        <Link to="/angular">Todo de Angular</Link><br/>
                                        <Link to="/node-js">Todo de Node.js</Link>
                                    </div>

                                    <div className="home-description">
                                        <br/>
                                        <p>
                                            Sígueme en mis redes sociales, para estar informado 😊
                                        </p>
                                    </div>

                                    <div className="post-follow follow-twitter">
                                        <a href="https://twitter.com/NikoRozoArch" target="_blank" rel="noopener noreferrer">
                                            <img className="site-nav-icon" src="/images/icons/twitter.svg" alt="Twitter" /> Sígueme
                                        </a>
                                    </div>

                                    <div className="post-follow follow-facebook">
                                        <a href="https://facebook.com/NikoRz-104620944605700" target="_blank" rel="noopener noreferrer">
                                            <img className="site-nav-icon" src="/images/icons/facebook.svg" alt="Facebook" /> Sígueme
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div>
                            {/* All the main content gets inserted here, index.js, post.js */}
                            {children}
                        </div>
                        }
                    </main>

                    

                </div>

                <div className="viewport-bottom">
                    {/* The footer at the very bottom of the screen */}
                    <footer className="site-foot">
                        <div className="site-foot-nav container">
                            <div className="site-foot-nav-left">
                                <Link to="/">{site.title}</Link> © 2020
                            </div>
                            <div className="site-foot-nav-right">
                                <Navigation data={site.navigation} navClass="site-foot-nav-item" />
                            </div>
                        </div>
                    </footer>

                </div>
            </div>

        </>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
    bodyClass: PropTypes.string,
    isHome: PropTypes.bool,
    data: PropTypes.shape({
        file: PropTypes.object,
        allGhostSettings: PropTypes.object.isRequired,
    }).isRequired,
}

const DefaultLayoutSettingsQuery = props => (
    <StaticQuery
        query={graphql`
            query GhostSettings {
                allGhostSettings {
                    edges {
                        node {
                            ...GhostSettingsFields
                        }
                    }
                }
                file(relativePath: {eq: "ghost-icon.png"}) {
                    childImageSharp {
                        fixed(width: 30, height: 30) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
            }
        `}
        render={data => <DefaultLayout data={data} {...props} />}
    />
)

export default DefaultLayoutSettingsQuery
