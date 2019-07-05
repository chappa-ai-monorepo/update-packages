#!/usr/bin/env node
const fs = require('fs');

const nextVersions = require(`@chappa'ai/next-package-version`);
const nextRc = require(`@chappa'ai/get-next-rc`);
const updateNestedDependencies = require(`@chappa'ai/update-nested-dependencies`);
const mri = require('mri');

const argv = process.argv.slice(2);
const args = mri(argv, { boolean: ['rc'] });

const writeFile = (path, pkg) => new Promise((resolve, reject) => {
  return fs.writeFile(path, `${JSON.stringify(pkg, null, 2)}\n`, (err) => err ? reject(err) : resolve());
});

const getVersion = async (rc, next, name, rcOpts) => {
  if (rc) {
    const { version } = await nextRc(name, next, rcOpts);
    return version;
  }

  return next;
};

nextVersions({ includePackage: true })
  .then(async (versions) => {
    const packages = await Promise.all(versions.map(async (v) => Object.assign(
      {},
      v.pkg,
      v.next ?
        {
          nextVersion: await getVersion(args.rc, v.next, v.name, {
            username: args.username,
            password: args.password,
          }),
        } :
        {}
    )));
    const updatedPackages = updateNestedDependencies(packages);

    updatedPackages.forEach((pkg, idx) => {
      writeFile(versions[idx].pkgPath, pkg);
    });
  });
