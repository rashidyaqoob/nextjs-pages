import { GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';

interface Post {
  id: number;
  title: string;
}

export default function PostsPage({ posts }: { posts: Post[] }) {
  return (
    <div>
      <h1>All Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>
              <p>{post.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}


export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();

  return {
    props: {
      posts,
    },
  };
};
