import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Hr,
} from '@react-email/components';
import * as React from 'react';
import { emailColors } from '@verial/design-tokens/colors';
import { brand } from '@verial/design-tokens/brand';

interface NewsletterProps {
  title: string;
  bodyHtml: string;
  contentType?: string;
  excerpt?: string;
  canonicalUrl?: string;
  unsubscribeUrl?: string;
}

export const Newsletter = ({
  title = 'Newsletter Title',
  bodyHtml = '<p>Newsletter content goes here.</p>',
  contentType = 'essay',
  excerpt = '',
  canonicalUrl = 'https://verial.xyz',
  unsubscribeUrl = '{{ unsubscribe_url }}',
}: NewsletterProps) => {
  return (
    <Html>
      <Head />
      <Preview>{excerpt || title}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Link href={brand.url} style={headerLink}>
              <Text style={headerText}>{brand.name}</Text>
            </Link>
            <Text style={tagline}>{contentType === 'systems' ? 'Systems Log' : 'Essays'}</Text>
          </Section>

          <Hr style={divider} />

          {/* Title */}
          <Section style={titleSection}>
            <Text style={titleStyle}>{title}</Text>
          </Section>

          {/* Body */}
          <Section
            style={bodySection}
            dangerouslySetInnerHTML={{ __html: bodyHtml }}
          />

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footer}>
            {canonicalUrl && (
              <Text style={footerText}>
                <Link href={canonicalUrl} style={footerLink}>
                  Read on verial.xyz →
                </Link>
              </Text>
            )}
            <Text style={footerText}>
              You received this because you subscribed to {brand.name}.
            </Text>
            <Text style={footerText}>
              <Link href={unsubscribeUrl} style={footerLink}>
                Unsubscribe
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default Newsletter;

// Styles — designed for light email clients with dark accents
const main: React.CSSProperties = {
  backgroundColor: '#f9f9f9',
  fontFamily:
    "'Georgia', 'Times New Roman', serif",
};

const container: React.CSSProperties = {
  maxWidth: '600px',
  margin: '0 auto',
  backgroundColor: emailColors.background,
};

const header: React.CSSProperties = {
  padding: '32px 24px 8px',
  textAlign: 'center' as const,
};

const headerLink: React.CSSProperties = {
  textDecoration: 'none',
};

const headerText: React.CSSProperties = {
  fontSize: '28px',
  fontWeight: 400,
  color: emailColors.foreground,
  letterSpacing: '0.05em',
  margin: '0',
  fontFamily: "'Georgia', serif",
};

const tagline: React.CSSProperties = {
  fontSize: '12px',
  color: emailColors.mutedForeground,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.15em',
  margin: '4px 0 0',
};

const divider: React.CSSProperties = {
  borderTop: `1px solid ${emailColors.border}`,
  margin: '0 24px',
};

const titleSection: React.CSSProperties = {
  padding: '24px 24px 0',
};

const titleStyle: React.CSSProperties = {
  fontSize: '24px',
  fontWeight: 600,
  color: emailColors.foreground,
  lineHeight: '1.3',
  margin: '0',
  fontFamily: "'Georgia', serif",
};

const bodySection: React.CSSProperties = {
  padding: '16px 24px 24px',
  fontSize: '16px',
  lineHeight: '1.7',
  color: emailColors.foreground,
  fontFamily: "'Georgia', serif",
};

const footer: React.CSSProperties = {
  padding: '16px 24px 32px',
  textAlign: 'center' as const,
};

const footerText: React.CSSProperties = {
  fontSize: '13px',
  color: emailColors.mutedForeground,
  margin: '4px 0',
};

const footerLink: React.CSSProperties = {
  color: emailColors.mutedForeground,
  textDecoration: 'underline',
};
