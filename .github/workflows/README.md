# GitHub Actions Workflows

## Test Workflow

A `test.yml` workflow automatikusan lefuttatja a unit teszteket minden pull request-nél és push-nál a main/master branch-re.

### Működés

1. **Trigger**: Pull request vagy push a main/master branch-re
2. **Folyamat**:
   - Kód checkout
   - Node.js 20 telepítése
   - Függőségek telepítése (`npm ci`)
   - Unit tesztek futtatása coverage-dal
   - Coverage threshold ellenőrzés (minimum 80%)
3. **Eredmény**:
   - Ha a tesztek átmennek és a coverage >= 80%, a workflow sikeres
   - Ha a tesztek nem mennek át vagy a coverage < 80%, a workflow fail
   - A fail workflow automatikusan megakadályozza a PR merge-elését (ha be van állítva a branch protection)

### Branch Protection

A PR-k automatikus blokkolásához be kell állítani a GitHub repository-ban a branch protection rule-t:

1. Repository Settings → Branches
2. Add rule a main/master branch-re
3. Enable "Require status checks to pass before merging"
4. Select "test" workflow

Így a PR csak akkor lesz merge-elhető, ha a tesztek átmennek.
