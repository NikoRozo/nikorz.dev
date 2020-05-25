import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { Layout } from '../components/common'
import { MetaData } from '../components/common/meta'

import Disqus from 'disqus-react';

/**
* Single post view (/:slug)
*
* This file renders a single post and loads all the content.
*
*/
const Post = ({ data, location }) => {
    const post = data.ghostPost
    const disqusShortname = 'nikorz-dev';
    const disqusConfig = {
      url: `https://nikorz.dev/${post.slug}/`,
      identifier: post.id,
      title: post.title
    };

    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="article"
            />
            <Helmet>
                <style type="text/css">{`${post.codeinjection_styles}`}</style>
            </Helmet>
            <Layout>
                <div className="container">
                    <article className="content">
                        
                        <section className="post-full-content">
                            <div className="post-content-inner">
                                <h1 className="content-title">{post.title}</h1>

                                {/* The main post content */ }
                                <section
                                    className="content-body load-external-scripts"
                                    dangerouslySetInnerHTML={{ __html: post.html }}
                                />

                            </div>
                            <div className="post-content-sidebar">
                                <div className="post-description">
                                    <h2>{post.title}</h2>
                                    <figure className="post-feature-image">
                                        <img src={post.feature_image} alt={post.title} />
                                    </figure>
                                    <div className="post-date">
                                        {post.updated_at_pretty}
                                    </div>
                                
                                    <p>{post.excerpt}</p>

                                    <div className="post-card-footer-left">
                                        <div className="post-card-avatar">   
                                            <a href={`/author/${post.primary_author.slug}`}>     
                                                {post.primary_author.profile_image ?
                                                    <img className="author-profile-image" src={post.primary_author.profile_image} alt={post.primary_author.name}/> :
                                                    <img className="default-avatar" src="/images/icons/avatar.svg" alt={post.primary_author.name}/>
                                                }
                                            </a>
                                        </div>
                                        <span>{ post.primary_author.name }</span>
                                    </div>
                                    
                                </div>
                                <div className="post-tags">
                                    {post.tags.map((tag, index) => (
                                        <a
                                        className="post-tag"
                                        href={`/tag/${tag.slug}`}
                                        key={index}
                                        >
                                        #{tag.name}
                                        </a>
                                    ))}
                                </div>
                                <div className="post-follow follow-twitter">
                                    <a href="https://twitter.com/NikoRozoArch" target="_blank" rel="noopener noreferrer">
                                        <img className="site-nav-icon" src="/images/icons/twitter.svg" alt="Twitter" /> Sígueme @NikoRozoArch
                                    </a>
                                </div>

                                <div className="post-follow follow-facebook">
                                    <a href="https://facebook.com/NikoRz-104620944605700" target="_blank" rel="noopener noreferrer">
                                        <img className="site-nav-icon" src="/images/icons/facebook.svg" alt="Facebook" /> Sígueme @NikoRozoArch
                                    </a>
                                </div>

                                <div className="post-coffee">
                                    <a href="https://www.buymeacoffee.com/NikoRz" target="_blank" rel="noopener noreferrer">
                                        <img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" />
                                    </a>
                                </div>
                            </div>
                        </section>
                        <section className="post-full-content">
                            <div className="post-disqus">
                                <Disqus.DiscussionEmbed
                                shortname={disqusShortname}
                                config={disqusConfig}
                                />
                            </div>
                        </section>
                    </article>
                </div>
            </Layout>
        </>
    )
}

Post.propTypes = {
    data: PropTypes.shape({
        ghostPost: PropTypes.shape({
            codeinjection_styles: PropTypes.object,
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            feature_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
}

export default Post

export const postQuery = graphql`
    query($slug: String!) {
        ghostPost(slug: { eq: $slug }) {
            ...GhostPostFields
        }
    }
`