## Adding or editing environment variables

  1. Add the variable to **Settings > Security > Secrets and Variables > Actions > Secrets/Variables** in the GitHub interface
  2. Add it to the `env` section of the workflow in `.github/workflows/deploy-frontend.yml`
  3. Add it to the template file in `ansible/templates/.env.j2`
