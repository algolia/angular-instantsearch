if (document.querySelector('.documentation-container')) {
  const $edit = document.createElement('a');
  $edit.classList.add('editThisPage');
  $edit.textContent = 'Edit this page';

  let href = 'https://github.com/algolia/angular-instantsearch/edit/master/';
  const doc = 'community-website/src/community-project-boilerplate-docgen/src';

  let pathname = document.location.pathname.replace(
    '/angular-instantsearch',
    ''
  );

  href += `${doc}${pathname.replace('.html', '.md')}`;
  pathname = pathname.replace('.html', '.md');
  $edit.href = href;
  document.querySelector('.documentation-container').appendChild($edit);
}
