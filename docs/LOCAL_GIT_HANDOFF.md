# Tayanch enrichment — local Git handoff

Sandbox Git metadata writes are blocked on this machine, so run these commands in a normal local Terminal from the project directory:

```bash
cd /Users/javohir/strawberryboo-site

# Current worktree is intentionally not on a new branch because sandbox git locks are blocked.
git switch -c feature/tayanch-course-enrichment

git add src content public/downloads docs examples

git commit -m "feat: enrich Tayanch course materials"
git push -u origin feature/tayanch-course-enrichment
```

Then open a Pull Request from `feature/tayanch-course-enrichment` into `main`, review the diff and checks, and merge it. The existing `.github/workflows/deploy.yml` deploys GitHub Pages after a push to `main`.

After merge, verify:

- `https://javohirqaxramonov36-web.github.io/strawberryboo-site/`
- `/kurslar/`
- `/narxlar/`
- `/ai-vositalar/`
- `/kurslar/prompt-engineering/`
- `/kurslar/ielts-writing/`
- `/downloads/prompt-engineering/prompt-kutubxonasi.md`

The practical Anthropic assessor will remain in safe “server not connected” mode until `PUBLIC_PRACTICAL_ASSESSMENT_ENDPOINT` is configured with the separately deployed worker and `ANTHROPIC_API_KEY` secret. Do not put that key in this repository.
