# Update Packages
> Update the npm packages in your yarn workspaces-based monorepo.

## Usage
```
yarn add -D "@chappa'ai/update-packages"
```

We recommend adding a command to your package.json.

```json
{
  ...
  "scripts": {
    "release:update": "update-packages"
  },
  ... 
}
```

## API

| Argument | Description
| --- | ---
| `--rc` | Whether or not each update should be tagged as a release candidate.
| `--username=<username>` | An npm username. Used to check the all release candidates on a potentially private package.
| `--password=<password>` | An npm password. Used to check the all release candidates on a potentially private package.
 