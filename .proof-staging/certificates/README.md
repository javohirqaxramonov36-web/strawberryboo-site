# Private certificate-preview staging

This directory is private staging only. Nothing here has been published, linked from a website, committed, pushed, or uploaded. Source PDFs are **not** copied into this directory.

## Output policy

The two files below are flattened, low-resolution WebP images with an embedded visible `PUBLIC PREVIEW` watermark and a `NOT VALID FOR VERIFICATION` notice. They are not verification documents and must never replace the source files or be offered as downloads of an original certificate/report.

Before any later publication, keep them view-only and do not expose the source PDF, a high-resolution copy, or an unwatermarked derivative.

## Staged previews

| File | Source (read only; never copied) | Retained visible facts | Full redactions / exclusions | Dimensions |
|---|---|---|---|---:|
| `ielts-overall-7-score-preview.webp` | `…/Attachments/ielts.pdf`, page 1 | IELTS Academic score-result context; Listening **6.5**, Reading **7.0**, Writing **7.5**, Speaking **6.0**, Overall Band **7.0**, CEFR **C1**. | Candidate name; photo; candidate/centre/test-report identifiers; date of birth; sex; nationality/origin/first language; all exact dates; signature; report number; centre/validation stamps; verification text/URL; administrative-comment area; PDF/image metadata. The crop contains only the test-results heading and score row. | 820 × 184 px |
| `sat-1420-score-preview.webp` | `…/Attachments/SAT.pdf`, page 1 | SAT score-summary context; Total Score **1420**. | Candidate name; grade; record locator; exact administration/test dates; section scores; percentiles; score scales/ranges; averages; skills-performance panel; QR code/URLs; footer; all metadata. The crop contains only the total-score label and number. | 420 × 368 px |

## Verification record

- **Visual inspection:** completed on the final staged WebP files. No direct identifier, photo, birth data, exact date, record/report ID, signature, QR code, URL, validation mark, or source-document page outside the approved score areas is visible.
- **Raster/metadata check:** outputs were newly rasterized into RGB WebP files (not PDF copies). The file-type check reports only WebP VP8 image data. No source PDF exists in this staging directory.
- **OCR check:** attempted with the local command-line OCR tool, which is not installed in this environment. A second attempt with local macOS Vision OCR could not compile because the host Swift/SDK toolchain versions are incompatible. Manual visual verification was therefore used as the decision check; the crops are intentionally narrow enough that no identity field is present. Do not treat this as a machine-OCR clearance—rerun OCR in a working environment before any external release if policy requires it.

## Safety constraints for later use

1. Keep these files private until separately authorized for a specific site placement.
2. If publication is authorized, use the existing low-resolution watermarked image only; never upload or link its source PDF.
3. Do not remove, obscure, crop out, or reduce the watermark/footer notice.
4. Do not add a verification link, download link, alt text containing sensitive data, or a caption claiming independent verification.
5. If a new crop or format is needed, regenerate it from the source using opaque redaction and repeat visual plus working OCR verification.
