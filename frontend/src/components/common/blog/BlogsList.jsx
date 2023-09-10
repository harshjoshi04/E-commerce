import React from "react";

const BlogsList = ({
  image,
  author,
  published_at,
  title,
  source,
  category,
  description,
  url,
}) => {
  let d = new Date(published_at);
  return (
    <div className="max-w-6xl mx-auto p-4 py-6 border-b-2  sm:px-6 h-full img-animation">
      <article className="max-w-sm mx-auto md:max-w-none grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 xl:gap-16 items-center">
        <a
          className="relative block group cursor-pointer"
          href={url}
          target="_blank"
        >
          <div
            className="absolute inset-0 bg-gray-800 hidden md:block transform md:translate-y-2 md:translate-x-4 xl:translate-y-4 xl:translate-x-8 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out pointer-events-none"
            aria-hidden="true"
          ></div>
          <figure className="relative h-0 pb-[56.25%] md:pb-[75%] lg:pb-[56.25%] overflow-hidden transform md:-translate-y-2 xl:-translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out">
            <img
              className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition duration-700 ease-out"
              src={image == null ? "/News.jpg" : image}
              width="540"
              height="303"
              alt="Blog post"
            />
          </figure>
        </a>
        <div>
          <header>
            <div className="mb-3">
              <ul className="flex flex-wrap text-xs font-medium -m-1">
                <li className="m-1">
                  <p
                    className="inline-flex text-center text-gray-100 py-1 px-3 rounded-full bg-purple-600 hover:bg-purple-700 transition duration-150 ease-in-out"
                    href="#0"
                  >
                    {source}
                  </p>
                </li>
                <li className="m-1">
                  <p
                    className="inline-flex text-center text-gray-100 py-1 px-3 rounded-full bg-blue-500 hover:bg-blue-600 transition duration-150 ease-in-out"
                    href="#0"
                  >
                    {category}
                  </p>
                </li>
              </ul>
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold leading-tight mb-2">
              <a
                className="hover:text-gray-800 transition duration-150 ease-in-out"
                href="#0"
              >
                {title}
              </a>
            </h3>
          </header>
          <p className="text-lg text-gray-400 flex-grow">{description}</p>
          <footer className="flex items-center mt-4">
            <a href="#0">
              <img
                className="rounded-full flex-shrink-0 mr-4"
                src="https://preview.cruip.com/open-pro/images/news-author-04.jpg"
                width="40"
                height="40"
                alt="Author 04"
              />
            </a>
            <div>
              <a
                className="font-medium text-gray-900 hover:text-gray-700 transition duration-150 ease-in-out"
                href="#0"
              >
                {author}
              </a>
              <span className="text-gray-700"> - </span>
              <span className="text-gray-500">{d.toLocaleDateString()}</span>
            </div>
          </footer>
        </div>
      </article>
    </div>
  );
};

export default BlogsList;
