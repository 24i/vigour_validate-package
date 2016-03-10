# lintpackage

This is a little script that looks at a `package.json` and warns you about missing or incorrect field. It's far from perfect but I'm finding it useful for myself...

## What it checks

see [the schema])(lib/schema.js)

## What it does

If a required field is missing, it will add it for you with a default value. If a field is incorrect, it will log a warning to give you an idea of how to fix it. It does not change any existing fields, so you can always run this and never worry about messing up what is already there in the package.
