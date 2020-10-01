import styles from '../../styles/Home.module.scss'

export default function BlogId({blog}) {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{blog.title}</h1>
      <p className={styles.publishedAt}>{blog.publishedAt}</p>
      <p className={styles.category}>{blog.category && `${blog.category.name}`}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `${blog.body}`,
        }}
        className={styles.post}
      />
    </main>
  );
}

export const getStaticPaths = async () => {
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };

  const repos = await fetch(process.env.NEXT_PUBLIC_API_URL, key)
    .then(res => res.json())
    .catch(() => null);

  const paths = repos.contents.map(repo => `/blog/${repo.id}`);
  // MEMO: fallback: false SSGされていない場合に404にリダイレクト
  return {paths, fallback: false};
};

export const getStaticProps = async context => {
  const id = context.params.id;

  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${id}`,
    key,
  )
    .then(res => res.json())
    .catch(() => null);

  return {
    props: {
      blog: data,
    },
  };
};
