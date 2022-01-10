import React from 'react'
import { LoaderFunction, useLoaderData } from 'remix'

import ModeToggle from '~/components/ModeToggle'
import Theme from '~/components/Theme'
import { InternalLink, ExternalLink } from '~/components/Links'
import HeroBanner from '~/components/HeroBanner'
import SocialLinks from '~/components/SocialLinks'
import useFadeIn from '~/hooks/useFadeIn'
import { getLinks } from '~/queries/links'
import type { Link } from '~/types/links'
import { formatLinks } from '~/util/links'

export const loader: LoaderFunction = async () => {
  const links = await getLinks()
  if (links) {
    return formatLinks(links)
  }

  return null
}

function Links() {
  const [imageAnimation, imageRef] = useFadeIn({ duration: 1, fadeFrom: 'top' })
  const [socialsAnimation, socialsRef] = useFadeIn({
    duration: 1,
    delay: 500,
    fadeFrom: 'left',
  })
  const [linksAnimation, linksRef] = useFadeIn({
    duration: 1,
    delay: 1000,
    fadeFrom: 'right',
  })
  const { customLinks, socialLinks } =
    useLoaderData<{
      customLinks: Link[]
      socialLinks: { [key: string]: string }
    }>()

  return (
    <Theme>
      <div className="relative w-full h-[100vh]">
        <HeroBanner fullHeight />
        <main className="relative max-w-screen-md m-auto">
          <div className="absolute z-10 top-0 left-0 w-full">
            <div className="flex flex-row-reverse">
              <div className="flex items-center p-7">
                <ModeToggle />
              </div>
            </div>
          </div>
          <div
            className="flex justify-center pt-16 pb-4"
            style={imageAnimation}
            ref={imageRef}
          >
            <img
              src="/assets/png/AndrewCandid.png"
              className="h-[150px] w-[150px] border-solid border-4 bg-orange-500 border-gray-50 rounded-full hvr-float-shadow"
              alt="Candid headshot of Andrew"
            />
          </div>
          <div
            className="z-10 flex justify-center m-auto relative"
            style={imageAnimation}
            ref={imageRef}
          >
            <h2 className="text-gray-50 tracking-widest">Andrew Lazenka</h2>
          </div>
          <div
            className="flex flex-wrap w-4/5 justify-around m-auto py-6 max-w-[50%]"
            style={socialsAnimation}
            ref={socialsRef}
          >
            <SocialLinks {...socialLinks} iconClassName="text-gray-50" />
          </div>
          <div style={linksAnimation} ref={linksRef}>
            {customLinks.map((l) => (
              <>
                {l.url.charAt(0) === '/' ? (
                  <div className="flex justify-center m-auto">
                    <InternalLink
                      className="block relative w-4/5 my-4 py-4 hover:bg-orange-500 text-gray-50 border-solid border-2 border-gray-50 rounded-full m-auto text-center uppercase font-semibold tracking-[0.2em]"
                      to={l.url}
                    >
                      {l.content}
                    </InternalLink>
                  </div>
                ) : (
                  <div className="flex justify-center m-auto">
                    <ExternalLink
                      className="block relative w-4/5 my-4 py-4 hover:bg-orange-500 text-gray-50 border-solid border-2 border-gray-50 rounded-full m-auto text-center uppercase font-semibold tracking-[0.2em]"
                      to={l.url}
                    >
                      {l.content}
                    </ExternalLink>
                  </div>
                )}
              </>
            ))}
          </div>
        </main>
      </div>
    </Theme>
  )
}

export default Links