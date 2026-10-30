import { getNextReleaseVersion } from '../../src/getNextReleaseVersion'

const fixture = vi.hoisted(() => ({
  version: '0.0.0-development',
  resolveVersion: vi.fn(),
}))

vi.mock('node:module', () => ({
  createRequire: () => (name: string) => {
    if (name === '@dnb/eufemia/package.json') {
      return { version: fixture.version }
    }

    if (name === '@dnb/eufemia/scripts/postbuild/getNextReleaseVersion') {
      return { getNextReleaseVersion: fixture.resolveVersion }
    }

    throw new Error(`Unexpected module: ${name}`)
  },
}))

beforeEach(() => {
  fixture.version = '0.0.0-development'
  fixture.resolveVersion.mockReset()
})

describe('documentation build version', () => {
  it('uses an explicitly versioned fork without resolving an upstream release', async () => {
    fixture.version = '0.1.0-kateholthe.0'

    expect(await getNextReleaseVersion()).toBe('0.1.0-kateholthe.0')
    expect(fixture.resolveVersion).not.toHaveBeenCalled()
  })

  it('preserves upstream release version resolution', async () => {
    fixture.resolveVersion.mockResolvedValue('11.17.0')

    expect(await getNextReleaseVersion()).toBe('11.17.0')
  })

  it('retains the development version for an unversioned development branch', async () => {
    fixture.resolveVersion.mockResolvedValue(null)

    expect(await getNextReleaseVersion()).toBe('0.0.0-development')
  })
})
