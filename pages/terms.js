import React from 'react'

import Page from '../components/Page'

export default function Terms() {
  return (
    <Page title="Terms of Service">
      <div className="terms">
        <h1>Terms of Service</h1>
        <p className="last-modified">Last modified: June 27th, 2019</p>

        <h4 id="terms">Terms</h4>
        <p>
          By accessing the website at https://carbon.now.sh, you are agreeing to be bound by these
          terms of service, all applicable laws and regulations, and agree that you are responsible
          for compliance with any applicable local laws. If you do not agree with any of these
          terms, you are prohibited from using or accessing this site. The materials contained in
          this website are protected by applicable copyright and trademark law.
        </p>

        <h4 id="use">Use License</h4>
        <ol>
          <li>
            Permission is granted to temporarily download one copy of the materials (information or
            software) on Carbon&apos;s website for personal, non-commercial transitory viewing only.
            This is the grant of a license, not a transfer of title, and under this license you may
            not:
          </li>
          <ol>
            <li>modify or copy the materials;</li>
            <li>
              use the materials for any commercial purpose, or for any public display (commercial or
              non-commercial);
            </li>
            <li>
              attempt to decompile or reverse engineer any software contained on Carbon&apos;s
              website;
            </li>
            <li>remove any copyright or other proprietary notations from the materials; or</li>
            <li>
              transfer the materials to another person or &quot;mirror&quot; the materials on any
              other server.
            </li>
          </ol>
          <li>
            This license shall automatically terminate if you violate any of these restrictions and
            may be terminated by Carbon at any time. Upon terminating your viewing of these
            materials or upon the termination of this license, you must destroy any downloaded
            materials in your possession whether in electronic or printed format.
          </li>
        </ol>

        <h4 id="disclaimer">Disclaimer</h4>
        <ol>
          <li>
            The materials on Carbon website are provided on an &apos;as is&apos; basis. Carbon makes
            no warranties, expressed or implied, and hereby disclaims and negates all other
            warranties including, without limitation, implied warranties or conditions of
            merchantability, fitness for a particular purpose, or non-infringement of intellectual
            property or other violation of rights.
          </li>
          <li>
            Further, Carbon does not warrant or make any representations concerning the accuracy,
            likely results, or reliability of the use of the materials on its website or otherwise
            relating to such materials or on any sites linked to this site.
          </li>
        </ol>

        <h4 id="limitations">Limitations</h4>
        <p>
          In no event shall Carbon or its suppliers be liable for any damages (including, without
          limitation, damages for loss of data or profit, or due to business interruption) arising
          out of the use or inability to use the materials on Carbon&apos;s website, even if Carbon
          or a Carbon authorized representative has been notified orally or in writing of the
          possibility of such damage. Because some jurisdictions do not allow limitations on implied
          warranties, or limitations of liability for consequential or incidental damages, these
          limitations may not apply to you.
        </p>

        <h4 id="accuracy">Accuracy of Materials</h4>
        <p>
          The materials appearing on Carbon&apos;s website could include technical, typographical,
          or photographic errors. Carbon does not warrant that any of the materials on its website
          are accurate, complete or current. Carbon may make changes to the materials contained on
          its website at any time without notice. However Carbon does not make any commitment to
          update the materials.
        </p>

        <h4 id="links">Links</h4>
        <p>
          Carbon has not reviewed all of the sites linked to its website and is not responsible for
          the contents of any such linked site. The inclusion of any link does not imply endorsement
          by Carbon of the site. Use of any such linked website is at the user&apos;s own risk.
        </p>

        <h4 id="modifications">Modifications</h4>
        <p>
          Carbon may revise these terms of service for its website at any time without notice. By
          using this website you are agreeing to be bound by the then current version of these terms
          of service.
        </p>

        <h4 id="governing">Governing Law</h4>
        <p>
          These terms and conditions are governed by and construed in accordance with the laws of
          California and you irrevocably submit to the exclusive jurisdiction of the courts in that
          State or location.
        </p>
      </div>
      <style jsx>
        {`
          .terms {
            max-width: 632px;
          }

          h4 {
            font-weight: 600;
            text-decoration: underline;
          }

          p,
          li {
            color: #fff;
          }

          span {
            color: #fff;
          }

          ol {
            list-style-type: lower-alpha;
            list-style-position: inside;
          }
          ol ol {
            list-style-type: lower-roman;
            list-style-position: inside;
            padding-inline-start: 40px;
          }

          li {
            margin-bottom: var(--x1);
          }
        `}
      </style>
    </Page>
  )
}
